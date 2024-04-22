import { Entity } from "src/modules/shared/core/domain/entity.abstract";
import { StringValueObject } from "src/modules/shared/core/domain/string.value-object";
import { UUIDValueObject } from "src/modules/shared/core/domain/uuid.value-object";
import {
  QuestionType,
  QuestionTypeValueObject,
} from "../value-objects/question-type.value-object";
import {
  AnswerOptionEntity,
  type IAnswerOptionEntityCreationProps,
  type IAnswerOptionEntityUpdateProps,
  type IPrimitiveAnswerOptionEntity,
} from "./answer-option.entity";

export interface IQuestionEntityProps
  extends Pick<QuestionEntity, "id" | "surveyId" | "description" | "type">,
    Partial<Pick<QuestionEntity, "answerOptions">> {}

export interface IQuestionEntityCreationProps
  extends Omit<IQuestionEntityProps, "id" | "answerOptions"> {
  answerOptions?: IAnswerOptionEntityCreationProps[];
}

export interface IQuestionEntityUpdateProps
  extends Partial<
    Omit<IQuestionEntityProps, "id" | "surveyId" | "answerOptions">
  > {}

export interface IPrimitiveQuestionEntity {
  id: string;
  surveyId: string;
  description: string;
  type: QuestionType;
  answerOptions: IPrimitiveAnswerOptionEntity[];
}

export class QuestionEntity extends Entity<UUIDValueObject> {
  private _surveyId: UUIDValueObject;
  private _description: StringValueObject;
  private _type: QuestionTypeValueObject;
  private _answerOptions: AnswerOptionEntity[];

  constructor(props: IQuestionEntityProps) {
    super(props.id);
    this._surveyId = props.surveyId;
    this._description = props.description;
    this._type = props.type;
    this._answerOptions = props.answerOptions ?? [];
  }

  static create(props: IQuestionEntityCreationProps): QuestionEntity {
    const id: UUIDValueObject = new UUIDValueObject(crypto.randomUUID());

    return new QuestionEntity({
      ...props,
      id,
      answerOptions: props.answerOptions?.map((answerOptionProps) =>
        AnswerOptionEntity.create({ ...answerOptionProps, questionId: id }),
      ),
    });
  }

  static fromPrimitive(props: IPrimitiveQuestionEntity): QuestionEntity {
    const { id, surveyId, description, type, answerOptions } = props;
    return new QuestionEntity({
      id: new UUIDValueObject(id),
      surveyId: new UUIDValueObject(surveyId),
      description: new StringValueObject(description),
      type: new QuestionTypeValueObject(type),
      answerOptions: answerOptions?.map(
        (answerOption: IPrimitiveAnswerOptionEntity) =>
          AnswerOptionEntity.fromPrimitive(answerOption),
      ),
    });
  }

  toPrimitive(): IPrimitiveQuestionEntity {
    return this.getPrimitiveEntity();
  }

  // TODO: Improve the question update logic
  update(questionUpdateProps: IQuestionEntityUpdateProps): void {
    if (questionUpdateProps.type?.toPrimitive() === QuestionType.TEXT) {
      this._answerOptions = [];
    }
    Object.assign(this, questionUpdateProps);
  }

  createAnswerOption(
    answerOptionCreationProps: IAnswerOptionEntityCreationProps,
  ): AnswerOptionEntity {
    const primitiveType: string = this._type.toPrimitive();
    if (primitiveType === QuestionType.TEXT) {
      throw new Error(
        `No se puede crear una opción de respuesta a las preguntas de tipo ${primitiveType}`,
      );
    }
    const answerOption: AnswerOptionEntity = AnswerOptionEntity.create(
      answerOptionCreationProps,
    );
    this._answerOptions.push(answerOption);
    return answerOption;
  }

  updateAnswerOptionById(
    answerOptionId: UUIDValueObject,
    answerOptionUpdateProps: IAnswerOptionEntityUpdateProps,
  ): AnswerOptionEntity {
    const answerOption: AnswerOptionEntity | undefined =
      this.findAnswerOptionById(answerOptionId);
    if (!answerOption) {
      throw new Error(
        `La opción de respuesta con id ${answerOptionId.toPrimitive()} no existe`,
      );
    }
    answerOption.update(answerOptionUpdateProps);
    return answerOption;
  }

  deleteAnswerOptionById(answerOptionId: UUIDValueObject): AnswerOptionEntity {
    let answerOptionDeleted: AnswerOptionEntity | undefined;
    this._answerOptions = this.answerOptions.filter(
      (answerOption: AnswerOptionEntity) => {
        if (answerOption.id.equals(answerOptionId)) {
          answerOptionDeleted = answerOption;
          return false;
        }
        return true;
      },
    );
    if (!answerOptionDeleted) {
      throw new Error(
        `La opción de respuesta con id ${answerOptionId.toPrimitive()} no existe`,
      );
    }
    return answerOptionDeleted;
  }

  private findAnswerOptionById(
    answerOptionId: UUIDValueObject,
  ): AnswerOptionEntity | undefined {
    return this._answerOptions.find((answerOption: AnswerOptionEntity) =>
      answerOption.id.equals(answerOptionId),
    );
  }

  get surveyId(): UUIDValueObject {
    return this._surveyId;
  }

  private set surveyId(surveyId: UUIDValueObject) {
    this._surveyId = surveyId;
  }

  get description(): StringValueObject {
    return this._description;
  }

  private set description(description: StringValueObject) {
    this._description = description;
  }

  get type(): QuestionTypeValueObject {
    return this._type;
  }

  private set type(type: QuestionTypeValueObject) {
    this._type = type;
  }

  get answerOptions(): AnswerOptionEntity[] {
    return this._answerOptions;
  }

  private set answerOptions(answerOptions: AnswerOptionEntity[]) {
    this._answerOptions = answerOptions;
  }
}
