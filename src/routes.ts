export enum Routes {
    ROOT = '/',
    GROUPS = '/groups',
    GROUPS_EDIT = '/groups/:id',
    GROUPS_ADMIN_VIEW = '/groups/:id/admin-view',
    GROUPS_DETAILS = '/groups/:id/details',
    PROPOSALS_VIEW = '/proposals/:id',
    PROPOSALS_NEW_TEXT = '/groups/:id/proposals/new/text',
    PROPOSALS_NEW_STAKE = '/groups/:id/proposals/new/stake',
    PROPOSALS_NEW_SPEND = '/groups/:id/proposals/new/spend',
    PROPOSALS_NEW_CREATE_ACCOUNT = '/groups/:id/proposals/new/create-account',
    PROPOSALS_NEW_PARAMETER_CHANGE = '/groups/:id/proposals/new/parameter-change',
    PROPOSALS_NEW_CUSTOM = '/groups/:id/proposals/new/custom',
    SETTINGS = '/settings'
}
