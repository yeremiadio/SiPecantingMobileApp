import {RootStackParamList} from './reactNavigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

declare module '*.png' {
  export default '' as string;
}
declare module '*.svg' {
  export default '' as string;
}
declare module '*.jpeg' {
  export default '' as string;
}
declare module '*.jpg' {
  export default '' as string;
}
