import {
  LoadingContextProps,
  ModalContextProps,
  ScrollContextProps,
  WidthContextProps,
} from "../contexts";

export interface ContextPropsDict {
  loading: LoadingContextProps;
  scroll: ScrollContextProps;
  width: WidthContextProps;
  modal: ModalContextProps;
  mode: boolean;
}
export type ContextsType = "loading" | "scroll" | "width" | "modal" | "mode";

export type ContextPropType<K extends ContextsType> = ContextPropsDict[K];

export type ContextValueObjectType = Pick<ContextPropsDict, ContextsType>;
