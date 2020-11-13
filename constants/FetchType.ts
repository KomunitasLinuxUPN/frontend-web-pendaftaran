export enum Fetch {
  ALL = 'allMembers',
  REGISTERED = 'membersRegistered',
  PENDING = 'membersPending',
}

export const FetchType = Object.freeze({
  ALL: Fetch.ALL,
  REGISTERED: Fetch.REGISTERED,
  PENDING: Fetch.PENDING,
})
