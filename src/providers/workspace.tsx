import { Workspace } from '@prisma/client';
import { createContext, ReactElement, useContext, useState } from 'react';

const initialState = {
  setWorkspace: (_workspace: Workspace): void => {},
  workspace: null as Workspace | null,
};

const WorkspaceContext = createContext(initialState);

export const useWorkspace = () => useContext(WorkspaceContext);

const WorkspaceProvider = ({ children }: { children: Array<ReactElement> }) => {
  const [workspace, setWorkspaceState] = useState<Workspace | null>(null);

  const setWorkspace = (workspace: Workspace) => {
    setWorkspaceState(workspace);
  };

  return (
    <WorkspaceContext.Provider value={{ setWorkspace, workspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceProvider;
