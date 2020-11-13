import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { uuid } from 'vue-uuid'

import RegConfirmBody from '@/backend/models/RegConfirmBody'
import { FirestoreNewMember, Member, MemberInput } from '@/models/NewMember'
import { RootState } from './index'

/*
 * Namespace
 */
export const MEMBERS = 'members'

/*
 * State
 */
export const state = () => ({
  members: [] as Member[],
})

export type MembersState = ReturnType<typeof state>

/*
 * Getters
 */
export const GetterType = {
  REGISTERED_MEMBERS: 'registeredMembers',
  PENDING_MEMBERS: 'pendingMembers',
  MEMBERS: 'members',
}

export const getters: GetterTree<MembersState, RootState> = {
  [GetterType.REGISTERED_MEMBERS](state) {
    return state.members.filter((member) => {
      return (
        member.verification.isVerified === true &&
        member.verification.token === ''
      )
    })
  },
  [GetterType.PENDING_MEMBERS](state) {
    return state.members.filter((member) => {
      return (
        member.verification.isVerified === false &&
        member.verification.token !== ''
      )
    })
  },
  [GetterType.MEMBERS](state) {
    return state.members
  },
}

/*
 * Mutations
 */
export const MutationType = {
  SET_MEMBERS: 'setMembers',
}

export const mutations: MutationTree<MembersState> = {
  [MutationType.SET_MEMBERS](state, members: Member[]) {
    state.members.length = 0
    state.members.push(...members)
  },
}

/*
 * Actions
 */
export const ActionType = {
  REGISTER_MEMBER: 'registerNewMember',
  FETCH_MEMBERS: 'fetchMembers',
  SET_MEMBERS: 'setMembers',
}

export const actions: ActionTree<MembersState, RootState> = {
  async [ActionType.REGISTER_MEMBER](_, newMemberInput: MemberInput) {
    const memberSnapshots = await this.$fire.firestore
      .collection('members')
      .where('email', '==', newMemberInput.email)
      .get()

    if (!memberSnapshots.empty) {
      throw new Error(`Email ${newMemberInput.email} sudah terpakai`)
    }

    const token = uuid.v4()

    await this.$axios.post(
      `http://localhost:3000/backend/confirm-registration`,
      {
        email: newMemberInput.email,
        token,
      } as RegConfirmBody
    )

    const storageRef = this.$fire.storage.ref()
    const photoRef = storageRef.child(`photos/${newMemberInput.email}`)
    await photoRef.put(newMemberInput.photo!)
    const photoURL = await photoRef.getDownloadURL()

    const newMember: FirestoreNewMember = {
      name: newMemberInput.name!,
      address: newMemberInput.address!,
      generation: newMemberInput.generation!,
      department: newMemberInput.department!,
      email: newMemberInput.email!,
      phone: newMemberInput.phone!,
      lineID: newMemberInput.lineID!,
      photoURL,
      verification: {
        isVerified: false,
        token,
      },
    }

    await this.$fire.firestore.collection('members').add(newMember)
  },
  async [ActionType.FETCH_MEMBERS](vuexContext) {
    const memberSnapshots = await this.$fire.firestore
      .collection('members')
      .get()

    const members = memberSnapshots.docs.map((memberSnapshot) => {
      return memberSnapshot.data() as Member
    })

    vuexContext.commit(MutationType.SET_MEMBERS, members)
  },
  [ActionType.SET_MEMBERS](vuexContext, members: Member[]) {
    vuexContext.commit(MutationType.SET_MEMBERS, members)
  },
}
