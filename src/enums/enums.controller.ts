import { Request, Response } from 'express';
import { Gender, BloodType, Classification, Transport, DosageUnit } from '@prisma/client';

const prismaEnums = {
  gender: Gender,
  bloodType: BloodType,
  classification: Classification,
  transport: Transport,
  dosageUnit: DosageUnit
};

export const getEnums = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    if (type) {
      const enumType = prismaEnums[type as keyof typeof prismaEnums];
      if (!enumType) {
        return res.status(404).json({ error: 'Enum não encontrado' });
      }

      // O Prisma já fornece os valores mapeados
      const enumValues = Object.entries(enumType).map(([key, value]) => ({
        value: key,
        label: value
      }));

      return res.json(enumValues);
    }

    // Se não especificar um tipo, retorna todos os enums
    const allEnums = Object.entries(prismaEnums).reduce((acc, [key, enumType]) => {
      acc[key] = Object.entries(enumType).map(([enumKey, enumValue]) => ({
        value: enumKey,
        label: enumValue
      }));
      return acc;
    }, {} as Record<string, { value: string; label: string }[]>);

    return res.json(allEnums);
  } catch (error) {
    console.error('Erro ao buscar enums:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}; 