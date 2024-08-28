import { apiClient } from "context/http";
import { EditUserForm, User } from "pages/public/auth/auth.model";
function getUserDetail(): Promise<User> {
  return apiClient.get("/auth/introspect", {});
}

function editUser(editUser: EditUserForm) {
  return apiClient.post("/auth/user/edit", editUser, {});
}

function editProfile(editUser: User) {
  return apiClient.post("/auth/user/profile/update", editUser, {});
}

function editProfileName(editUser: User) {
  return apiClient.post("/auth/user/profile/update/name", editUser, {});
}

export { getUserDetail, editUser, editProfile, editProfileName };
