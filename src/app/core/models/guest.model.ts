export class Guest {
    constructor(
        public success: boolean,
        public guest_session_id: string,
        public expires_at: string
    ) { }
}