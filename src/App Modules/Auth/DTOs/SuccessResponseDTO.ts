/*eslint-disable*/
export class SuccessResponseDTO {
  constructor(userID: number, userEmail: string) {
    this.userID = userID;
    this.userEmail = userEmail;
  }

  userID: number;
  userEmail: string;
}
