// selectedContext.tsx
import { 
  createContext, 
  useState, 
  ReactNode, 
  SetStateAction, 
  Dispatch 
} from 'react';

interface SelectedContextType {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

const SelectedContext = createContext<SelectedContextType>({
  selected: 0,
  setSelected: () => {},
});

interface SelectedProviderProps {
  children: ReactNode;
}

export function SelectedProvider({ children }: SelectedProviderProps) {
  const [selected, setSelected] = useState(0);

  return (
    <SelectedContext.Provider value={{ selected, setSelected }}>
      { children }
    </SelectedContext.Provider>
  );
}

export default SelectedContext;
