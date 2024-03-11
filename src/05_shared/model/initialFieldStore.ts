import {ENameField, ETypeField, TFields} from "@/05_shared/model/typesField";

export const initialFields: TFields = {
    "id": {
        name: ENameField.id,
        type: ETypeField.Input
    },
    "admissionDate": {
        name: ENameField.admissionDate,
        type: ETypeField.Date
    },
    "dismissalDate": {
        name: ENameField.dismissalDate,
        type: ETypeField.Date
    },
    "individual": {
        name: ENameField.individual,
        type: ETypeField.Input
    },
    "organization": {
        name: ENameField.organization,
        type: ETypeField.Input
    },
    "profession": {
        name: ENameField.profession,
        type: ETypeField.Input
    },
    "dismissalArticle": {
        name: ENameField.dismissalArticle,
        type: ETypeField.Input
    },
    "dismissalReason": {
        name: ENameField.dismissalReason,
        type: ETypeField.Input
    },
    "position": {
        name: ENameField.position,
        type: ETypeField.Input
    },
    "note": {
        name: ENameField.note,
        type: ETypeField.Textarea
    },
    "seniorityTypeMCList": {
        name: ENameField.seniorityTypeMCList,
        type: ETypeField.Input
    },
    "organizationText": {
        name: ENameField.organizationText,
        type: ETypeField.Textarea
    },
    "admissionOrderDate": {
        name: ENameField.admissionOrderDate,
        type: ETypeField.Date
    },
    "admissionOrderNumber": {
        name: ENameField.admissionOrderNumber,
        type: ETypeField.Input
    },
    "dismissalOrderDate": {
        name: ENameField.dismissalOrderDate,
        type: ETypeField.Date
    },
    "dismissalOrderNumber": {
        name: ENameField.dismissalOrderNumber,
        type: ETypeField.Input
    },
    "department": {
        name: ENameField.department,
        type: ETypeField.Input
    }
}