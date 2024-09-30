import {Response} from "express";
import {BloodType} from "@prisma/client";

class Util {

    static handleError(res: Response, error: unknown, msg: string) {
        if (error instanceof Error) {
            console.error(`${msg}: ${error} `);
            return res.status(400).json({error: error.message});
        } else {
            console.error(`Unexpected error ${error}`);
            return res.status(500).json({error: "An unexpected error occurred."});
        }
    }

    static validNumberGreaterThanZero(numberValue: any, fieldName: String) {
        if (typeof numberValue !== "number" || numberValue <= 0) {
            throw new Error(`Invalid ${fieldName}: must be a positive number.`);
        }
    }

    static validNumber(numberValue: any, fieldName: String) {
        if (typeof numberValue !== "number") {
            throw new Error(`Invalid ${fieldName}.`);
        }
    }

    static validBoolean(booleanValue: any, fieldName: String) {
        if (typeof booleanValue !== "boolean") {
            throw new Error(`Invalid ${fieldName}: must be a boolean.`);
        }
    }

    /**
     * Método tem como função de validar se uma string é valida, ou seja, se ela está preenchida.
     * @param text valor da string a ser validada
     * @param fieldName caso exteja inválida utiliza este campo para informar o nome do atributo que está inválido.
     * @throws Error irá gerar um error caso o text não for uma string.
     */
    static validString(text: any, fieldName: String) {
        if (typeof text !== "string" || text.trim().length === 0) {
            throw new Error(`Invalid ${fieldName}: must be a non empty string.`);
        }
    }

    /**
     * Método tem como função de validar se uma ID está com a quantidade de caracteres necessário a fim de evitar dar
     * erro na hora de salvar.
     * @param id
     * @param fieldName nome do campo
     * @throws Error irá gerar um erro informando que o id é inválido.
     */
    static validId(id: any, fieldName: String) {
        if (typeof id !== "string" || id.length !== 24) {
            throw new Error(`Invalid id for ${fieldName}: ${id}`);
        }
    }

    static validDate(dateValue: any, fieldName: String) {
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) {
            throw new Error(`Invalid date ${fieldName}: ${dateValue}.Accepted format '2024-09-30T02:23:11.792Z'`);
        }
    }

    /**
     * Método tem como função de validar um enum. Por ele ser generico ele aceita qualquer tipo de enum, sendo que
     * precisa passar o Enum, o valor que contém dentro do enum e o nome que será impresso caso dê falha no enum.
     * @param enumType Nome do enum
     * @param value valor do enum
     * @param enumName nome para ser impresso na mensagem.
     * @throws Error irá gerar um throw com a mensagem de erro.
     */
    static validEnum<T extends Record<string, string | number>>(enumType: T, value: any, enumName: String) {
        if (!Object.values(enumType).includes(value)) {
            throw new Error(`Invalid ${enumName}. Enter one of the following values: ${Object.values(enumType).join(', ')}`);
        }
    }
}

export {Util}

