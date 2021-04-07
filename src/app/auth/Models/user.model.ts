import { User as _User } from 'src/app/auth/Models/user.model';
export interface User{
  _id?: string
  name?: string
  lName?: string
  user?: string
  email?: string
  pass?: string
  rPass?: string
  fans?: _User[]
}