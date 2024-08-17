import {useAppDispatch} from '@/store';
import {resetArticleState} from '@/store/articleStoreApi';
import {resetGroupStoreApiState} from '@/store/groupStoreApi';

const useClearAllReduxCache = () => {
  const dispatch = useAppDispatch();
  return () => {
    dispatch(resetArticleState());
    dispatch(resetGroupStoreApiState());
  };
};

export default useClearAllReduxCache;
