import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { uuid } from 'vue-uuid'

import RegConfirmBody from '@/backend/models/RegConfirmBody'
import { FirestoreNewMember, NewMemberInput } from '@/models/NewMember'
import { RootState } from './index'

/*
 * Namespace
 */
export const membersStore = 'members'

/*
 * State
 */
export const state = (): unknown => ({})

export type MembersState = ReturnType<typeof state>

/*
 * Getters
 */
export const GetterType = {}

export const getters: GetterTree<MembersState, RootState> = {}

/*
 * Mutations
 */
export const MutationType = {}

export const mutations: MutationTree<MembersState> = {}

/*
 * Actions
 */
export const ActionType = {
  REGISTER_MEMBER: 'registerNewMember',
}

export const actions: ActionTree<MembersState, RootState> = {
  async [ActionType.REGISTER_MEMBER](_, newMemberInput: NewMemberInput) {
    const memberSnapshots = await this.$fire.firestore
      .collection('members')
      .where('email', '==', newMemberInput.email)
      .get()

    if (!memberSnapshots.empty) {
      throw new Error(`Email ${newMemberInput.email} sudah terpakai`)
    }

    const storageRef = this.$fire.storage.ref()
    const photoRef = storageRef.child(`photos/${newMemberInput.email}`)
    await photoRef.put(newMemberInput.photo!)
    const photoURL = await photoRef.getDownloadURL()

    const token = uuid.v4()

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

    await Promise.all([
      this.$fire.firestore.collection('members').add(newMember),
      this.$axios.post('http://localhost:3000/backend/confirm-registration', {
        email: newMemberInput.email,
        token,
      } as RegConfirmBody),
    ])
  },
}
