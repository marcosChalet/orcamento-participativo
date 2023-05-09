import React, {FC, createContext, useState} from 'react';

type UserContextType = {
  userId: number;
  logarUsuario?: (id?: number | undefined) => void;
};

interface Props {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({userId: 0});

export default UserContext;

export const UserProvider: FC<Props> = ({children}) => {
  const [userId, setUsuario] = useState(0);

  const logarUsuario = (id: number | undefined) => {
    if (id != undefined) {
      setUsuario(id);
    } else {
      setUsuario(0);
    }
  };

  return (
    <UserContext.Provider value={{userId, logarUsuario}}>
      {children}
    </UserContext.Provider>
  );
};
