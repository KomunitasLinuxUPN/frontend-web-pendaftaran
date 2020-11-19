import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { uuid } from 'vue-uuid'
import imageCompression from 'browser-image-compression'

import RegConfirmBody from '@/models/backend/RegConfirmBody'
import {
  FirestoreMember,
  Member,
  MemberInput,
  SimpleMember,
} from '@/models/Member'
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
  simpleRegisteredMembers: [] as SimpleMember[],
})

export type MembersState = ReturnType<typeof state>

/*
 * Getters
 */
export const GetterType = {
  REGISTERED_MEMBERS: 'registeredMembers',
  PENDING_MEMBERS: 'pendingMembers',
  MEMBERS: 'members',
  SIMPLE_REGISTERED_MEMBERS: 'simpleMembers',
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
  [GetterType.SIMPLE_REGISTERED_MEMBERS](state) {
    return state.simpleRegisteredMembers
  },
}

/*
 * Mutations
 */
export const MutationType = {
  SET_MEMBERS: 'setMembers',
  UPDATE_MEMBER: 'updateMember',
  DELETE_MEMBER: 'deleteMember',
  SET_SIMPLE_REGISTERED_MEMBERS: 'setSimpleMembers',
}

export const mutations: MutationTree<MembersState> = {
  [MutationType.SET_MEMBERS](state, members: Member[]) {
    state.members.length = 0
    state.members.push(...members)
  },
  [MutationType.UPDATE_MEMBER](state, updatedMember: Member) {
    const updatedMemberIndex = state.members.findIndex((member) => {
      return member.id === updatedMember.id
    })
    state.members[updatedMemberIndex] = updatedMember
  },
  [MutationType.DELETE_MEMBER](state, deletedMember: Member) {
    const unselectedMembers = state.members.filter((member) => {
      return member.id !== deletedMember.id
    })
    state.members.length = 0
    state.members.push(...unselectedMembers)
  },
  [MutationType.SET_SIMPLE_REGISTERED_MEMBERS](
    state,
    simpleRegisteredMembers: SimpleMember[]
  ) {
    state.simpleRegisteredMembers.length = 0
    state.simpleRegisteredMembers.push(...simpleRegisteredMembers)
  },
}

/*
 * Actions
 */
export const ActionType = {
  REGISTER_MEMBER: 'registerNewMember',
  FETCH_MEMBERS_FOR_ADMIN: 'fetchMembersForAdmin',
  RESEND_EMAIL_CONFIRMATION: 'sendEmailConfirmation',
  DELETE_MEMBER: 'deleteMember',
  FETCH_REGISTERED_MEMBERS_FOR_PUBLIC: 'fetchMembersForPublic',
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

    const comporessedPhoto = await imageCompression(newMemberInput.photo!, {
      maxSizeMB: 0.512,
      useWebWorker: true,
      maxIteration: 50,
    })

    const storageRef = this.$fire.storage.ref()
    const photoRef = storageRef.child(`photos/${newMemberInput.email}`)
    await photoRef.put(comporessedPhoto)
    const photoURL = await photoRef.getDownloadURL()

    const token = uuid.v4()

    const newMember: FirestoreMember = {
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

    await Promise.all([
      this.$fire.firestore.collection('members').add(newMember),
      this.$axios.post(`${process.env.BACKEND_URL}/confirm-registration`, {
        email: newMemberInput.email,
        token,
      } as RegConfirmBody),
    ])
  },
  async [ActionType.FETCH_MEMBERS_FOR_ADMIN](context) {
    const memberSnapshots = await this.$fire.firestore
      .collection('members')
      .get()

    const members = memberSnapshots.docs.map<Member>((memberSnapshot) => {
      const member = memberSnapshot.data() as FirestoreMember
      return {
        id: memberSnapshot.id,
        ...member,
      }
    })

    context.commit(MutationType.SET_MEMBERS, members)
  },
  async [ActionType.RESEND_EMAIL_CONFIRMATION](context, member: Member) {
    const newToken = uuid.v4()

    await Promise.all([
      this.$axios.post(`${process.env.BACKEND_URL}/confirm-registration`, {
        email: member.email,
        token: newToken,
      } as RegConfirmBody),
      this.$fire.firestore.collection('members').doc(member.id).update({
        'verification.isVerified': false,
        'verification.token': newToken,
      }),
    ])

    member.verification.isVerified = false
    member.verification.token = newToken
    context.commit(MutationType.UPDATE_MEMBER, member)
  },
  async [ActionType.DELETE_MEMBER](context, deletedMember: Member) {
    const storageRef = this.$fire.storage.ref()
    const photoRef = storageRef.child(`photos/${deletedMember.email}`)

    await Promise.all([
      this.$fire.firestore.collection('members').doc(deletedMember.id).delete(),
      photoRef.delete(),
    ])

    context.commit(MutationType.DELETE_MEMBER, deletedMember)
  },
  async [ActionType.FETCH_REGISTERED_MEMBERS_FOR_PUBLIC](context) {
    const memberSnapshots = await this.$fire.firestore
      .collection('members')
      .where('verification.token', '==', '')
      .where('verification.isVerified', '==', true)
      .get()

    const simpleRegisteredMembers = memberSnapshots.docs.map<SimpleMember>(
      (memberSnapshot) => {
        const member = memberSnapshot.data() as FirestoreMember
        return {
          id: memberSnapshot.id,
          name: member.name,
          department: member.department,
          generation: member.generation,
          isVerified: member.verification.isVerified,
        }
      }
    )

    context.commit(
      MutationType.SET_SIMPLE_REGISTERED_MEMBERS,
      simpleRegisteredMembers
    )
  },
}
