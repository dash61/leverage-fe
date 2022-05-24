// Helper functions to send api requests to the backend.
import { IUser, IContact, IAccessToken } from "../interfaces";


// Get all users.
export const apiGetUsers = async (): Promise<IUser[]> => {
  try {
    const url = "http://localhost:4000/users";
    const rsp: Response = await fetch(url);
    if (rsp.ok) {
      const data: IUser[] = await rsp.json();
      return data;
    }
    return [];
  } catch(err) {
    console.log("getUsers - EXCEPTION - err=", err);
  }
  return [];
}

// Add a new user.
export const apiAddUser = async (name: string, password: string, email: string): Promise<IUser> => {
  try {
    const url = "http://localhost:4000/users";
    const req: RequestInit = {
      body: JSON.stringify({ userName: name, userEmail: email, password }),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    };
    const rsp: Response = await fetch(url, req);
    if (rsp.ok) {
      const data: IUser = await rsp.json();
      return data;
    }
    return { userName: "", userEmail: "", password: "", id: -1 };;
  } catch(err) {
    console.log("addUser - EXCEPTION - err=", err);
  }
  return { userName: "", userEmail: "", password: "", id: -1 };;
}

// Add a new contact.
export const apiAddContact = async (
  name: string,
  email: string,
  phone: string,
  userId: number,
  token: string
): Promise<IContact> => {
  try {
    const url = "http://localhost:4000/contacts";
    const req: RequestInit = {
      body: JSON.stringify({ contactName: name, contactEmail: email, contactPhone: phone, user: { id: userId } }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
      method: "POST",
    };
    const rsp: Response = await fetch(url, req);
    if (rsp.ok) {
      const data: IContact = await rsp.json();
      return data;
    }
    return { contactName: "", contactEmail: "", contactPhone: "", id: -1 };
  } catch(err) {
    console.log("apiAddContact - EXCEPTION - err=", err);
  }
  return { contactName: "", contactEmail: "", contactPhone: "", id: -1 };
}

// Get all contacts.
export const apiGetContacts = async (token: string): Promise<IContact[]> => {
  try {
    const url = "http://localhost:4000/contacts";
    const req: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
      method: "GET",
    };
    const rsp: Response = await fetch(url, req);
    if (rsp.ok) {
      const data: IContact[] = await rsp.json();
      return data;
    }
    return [];
  } catch(err) {
    console.log("apiGetContacts - EXCEPTION - err=", err);
  }
  return [];
}

// Delete a contact.
export const apiDeleteContact = async (id: number, token: string): Promise<boolean> => {
  try {
    const url = `http://localhost:4000/contacts/id/${id}`;
    const req: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
      method: "DELETE",
    };
    const rsp: Response = await fetch(url, req);
    if (rsp.ok) {
        return true;
    }
    return false;
  } catch(err) {
    console.log("apiDeleteContact - EXCEPTION - err=", err);
  }
  return false;
}

// Get all contacts for a user.
export const apiGetContactsForUser = async (userId: number, token: string): Promise<IContact[]> => {
  try {
    const url = `http://localhost:4000/contacts/user/${userId}`;
    const req: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      credentials: "include",
      method: "GET",
    };
    const rsp: Response = await fetch(url, req);
    if (rsp.ok) {
      const data: IContact[] = await rsp.json();
      return data;
    }
    return [];
  } catch(err) {
    console.log("apiGetContactsForUser - EXCEPTION - err=", err);
  }
  return [];
}

// Login a user.
export const apiLoginUser = async (name: string, password: string): Promise<IAccessToken> => {
  try {
    const url = "http://localhost:4000/auth/login";
    const req: RequestInit = {
      body: JSON.stringify({ userName: name, password }),
      headers: {"Content-Type": "application/json"},
      method: "POST",
    };
    const rsp: Response = await fetch(url, req);
    if (rsp.ok) {
      const data: IAccessToken = await rsp.json();
      return data;
    }
    return { access_token: "", user: {} as IUser };
  } catch(err) {
    console.log("apiLoginUser - EXCEPTION - err=", err);
  }
  return { access_token: "", user: {} as IUser };
}
