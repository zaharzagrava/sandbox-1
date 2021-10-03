import {
  Args,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { v4 as uuidv4 } from "uuid";
import { knex } from "../../knex";
import { DBTable } from "../../types";

import { errorWrapper } from "../../middleware";
import { userFields } from "../../utils";

import { Document, DocumentReq } from "./model";
import { GetDocumentArgs, PostDocumentArgs } from "./args-types";
import { UserReq } from "../user/model";

@Resolver(Document)
export class DocumentResolver {
  @UseMiddleware(errorWrapper)
  @Query(() => Document)
  async getDocument(
    @Args() getDocumentArgs: GetDocumentArgs
  ): Promise<DocumentReq> {
    return (
      await knex
        .select("*")
        .from(DBTable.DOCUMENT)
        .whereRaw("id = ?", [getDocumentArgs.id])
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Document)
  async postDocument(
    @Args() postDocumentArgs: PostDocumentArgs
  ): Promise<DocumentReq> {
    return (
      await knex(DBTable.DOCUMENT)
        .insert({
          id: uuidv4(),
          text: postDocumentArgs.text,
          created_at: new Date(),
        })
        .returning("*")
    )[0];
  }

  @UseMiddleware(errorWrapper)
  @FieldResolver()
  async author(@Root() document: DocumentReq): Promise<UserReq> {
    const response = await knex
      .select(userFields)
      .join(
        DBTable.USER_DOCUMENT,
        `${DBTable.DOCUMENT}.id`,
        `${DBTable.USER_DOCUMENT}.document_id`
      )
      .join(
        DBTable.USER,
        `${DBTable.USER_DOCUMENT}.user_id`,
        `${DBTable.USER}.id`
      )
      .where(`${DBTable.DOCUMENT}.id`, document.id)
      .from(DBTable.DOCUMENT);

    return response[0];
  }
}
