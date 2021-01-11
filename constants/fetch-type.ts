export enum Fetch {
  ALL = 'allMembers',
  REGISTERED = 'membersRegistered',
  PENDING = 'membersPending',
}

/*
 * Constant FetchType untuk menentukan aksi pengambilan data members.
 * - Apakah ingin fetch semua data member?
 * - Apakah hanya ingin fetch member yang teregistrasi?
 * - Apakah hanya ingin fetch member yang belum teregistrasi / pending?
 */
export const FetchType = Object.freeze({
  ALL: Fetch.ALL,
  REGISTERED: Fetch.REGISTERED,
  PENDING: Fetch.PENDING,
})
