import {
  Args,
  FieldResolver,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { knex } from '../../knex';
import { DOCUMENT, USER, USER_DOCUMENT } from '../../types';

import { errorWrapper } from '../../middleware';
import { userFields } from '../../utils';

import { Document, DocumentReq } from './model';
import { GetDocumentArgs } from './args-types';
import { UserReq } from '../user/model';

@Resolver(Document)
export class DocumentResolver {
  @UseMiddleware(errorWrapper)
  @Query(() => Document)
  async getDocument(
    @Args() getDocumentArgs: GetDocumentArgs,
  ): Promise<DocumentReq> {
    return (
      await knex
        .select('*')
        .from(DOCUMENT)
        .whereRaw('id = ?', [getDocumentArgs.id])
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async author(@Root() document: DocumentReq): Promise<UserReq> {
    const response = await knex
      .select(userFields)
      .join(
        USER_DOCUMENT,
        `${DOCUMENT}.id`,
        `${USER_DOCUMENT}.document_id`,
      )
      .join(USER, `${USER_DOCUMENT}.user_id`, `${USER}.id`)
      .where(`${DOCUMENT}.id`, document.id)
      .from(DOCUMENT);

    return response[0];
  }
}
