// ------------------------------------------
// Auth Context Type
// ------------------------------------------

import { UserType } from "./types.user";

export interface AuthContextTypes {
  currentUser: UserType;
  setCurrentUser: any;
  loading: boolean;
  redirectTo: string;
  setRedirectTo: any;
  init: (delayTime?: number, callback?: (any?: any) => any) => Promise<void>;
}
