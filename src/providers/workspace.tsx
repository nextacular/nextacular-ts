import {createContext, ReactElement, useContext, useState } from 'react';
import { Workspace } from '@prisma/client';

const initialState = {
  setWorkspace: (workspace: Workspace | null) : void => {},
  workspace: null,
};

const WorkspaceContext = createContext(initialState);

export const useWorkspace = () => useContext(WorkspaceContext);

const WorkspaceProvider = ({ children } : {children: Array<ReactElement>}) => {
  const [workspace, setWorkspaceState] = useState(null);

  const setWorkspace = (workspace: Workspace | null) => {
    setWorkspaceState(workspace);
  };

  return (
    <WorkspaceContext.Provider value={{ setWorkspace, workspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceProvider;
