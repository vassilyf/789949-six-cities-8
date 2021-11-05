import {RawComment, Comment} from '../../types/types';

export const commentAdapter = (rawComment: RawComment) : Comment =>
  ({...rawComment, date: new Date(Date.parse(rawComment.date) )});


