export type TField = {
    name: ENameField,
    type: ETypeField,
    content?: string
}

export type TFields = {
    [K in keyof typeof ENameField]: TField
}

export enum ENameField {
    /** Уникальный идентификатор */
    id = "ID",

    /** Дата приема на работу */
    admissionDate = "Дата приема на работу",

    /** Дата увольнения */
    dismissalDate = "Дата увольнения",

    /** Физическое лицо */
    individual = "Физическое лицо",

    /** Организация. Длинное поле */
    organization = "Организация",

    /** Профессия */
    profession = "Профессия",

    /** Статья увольнения */
    dismissalArticle = "Статья увольнения",

    /** Причина увольнения */
    dismissalReason = "Причина увольнения",

    /** Должность */
    position = "Должность",

    /** Примечание. Длинное поле */
    note = "Примечание",

    /** Неуточненное поле, возможно, тип стажа работы для медицинских сертификатов */
    seniorityTypeMCList = "seniorityTypeMCList",

    /** Организация (текст) */
    organizationText = "Организация (текст)",

    /** Дата приказа о приеме */
    admissionOrderDate = "Дата приказа о приеме",

    /** Номер приказа о приеме */
    admissionOrderNumber = "Номер приказа о приеме",

    /** Дата приказа об увольнении */
    dismissalOrderDate = "Дата приказа об увольнении",

    /** Номер приказа об увольнении */
    dismissalOrderNumber = "Номер приказа об увольнении",

    /** Подразделение */
    department = "Подразделение"
}

export enum ETypeField {
    Input = 'input',
    Textarea = "textarea",
    Date = "date"
}