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
import {
  DeleteDocumentArgs,
  GetDocumentArgs,
  PostDocumentArgs,
  PutDocumentArgs,
  PutDocumentFields,
} from "./args-types";
import { UserReq } from "../user/model";
import { ErrorCodes, Errors } from "../../error";

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
  @Mutation(() => Document)
  async putDocument(
    @Args() putDocumentArgs: PutDocumentArgs
  ): Promise<DocumentReq> {
    const updateDocument: PutDocumentFields = {};
    for (const [key, value] of Object.entries(putDocumentArgs.fields))
      if (value !== undefined)
        updateDocument[key as keyof PutDocumentFields] = value;

    let updatedDocument = null;
    [updatedDocument] = await knex<DocumentReq>(DBTable.DOCUMENT)
      .update(updateDocument)
      .where("id", putDocumentArgs.id)
      .returning("*");

    return updatedDocument;
  }

  @UseMiddleware(errorWrapper)
  @Mutation(() => Boolean)
  async deleteDocument(
    @Args() deleteDocumentArgs: DeleteDocumentArgs
  ): Promise<Boolean> {
    const document = (await knex
      .delete("*")
      .where("id", deleteDocumentArgs.id)
      .from(DBTable.DOCUMENT)) as Document;

    if (!document) throw new Errors([ErrorCodes.DOCUMENT_NOT_FOUND]);

    return true;
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
