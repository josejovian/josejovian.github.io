import { ReactNode } from "react";
import {
  ModalContext,
  ModeContext,
  LoadingContext,
  ScrollContext,
  WidthContext,
} from "@/src/contexts";
import { ContextValueObjectType } from "../types";

export interface ContextProviderWrapperProps {
  children: ReactNode;
  values: ContextValueObjectType;
}

export function ContextProviderWrapper({
  children,
  values,
}: ContextProviderWrapperProps) {
  return (
    <LoadingContext.Provider value={values.loading}>
      <WidthContext.Provider value={values.width}>
        <ScrollContext.Provider value={values.scroll}>
          <ModeContext.Provider value={values.mode}>
            <ModalContext.Provider value={values.modal}>
              {children}
            </ModalContext.Provider>
          </ModeContext.Provider>
        </ScrollContext.Provider>
      </WidthContext.Provider>
    </LoadingContext.Provider>
  );
}
