import { SelectionNode, FieldNode } from 'graphql';

export const isFieldNode = (
  fieldNode: SelectionNode,
): fieldNode is FieldNode => {
  return (fieldNode as FieldNode).kind === 'Field';
};

export const isSomeEnum = <T>(e: T) => (
  token: any,
): token is T[keyof T] => Object.values(e).includes(token as string);
