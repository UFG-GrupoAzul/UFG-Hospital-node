import { Request, Response } from 'express';
import { Gender, BloodType, Classification, Transport, DosageUnit } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prismaEnums = {
  gender: Gender,
  bloodType: BloodType,
  classification: Classification,
  transport: Transport,
  dosageUnit: DosageUnit
};

function extractEnumMappings(enumName: string): Record<string, string> {
  const schemaPath = path.resolve(__dirname, '../../prisma/schema.prisma');
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');

  // Encontra o bloco do enum específico
  const enumRegex = new RegExp(`enum\\s+${enumName}\\s*{([^}]*)}`, 'i');
  const enumMatch = schemaContent.match(enumRegex);

  if (!enumMatch) {
    return {};
  }

  const enumBlock = enumMatch[1];
  const mappings: Record<string, string> = {};

  // Extrai cada linha do enum e procura pelo @map
  const lines = enumBlock.split('\n');
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('//')) {
      const [key, mapPart] = trimmedLine.split('@map');
      if (key && mapPart) {
        const value = mapPart.match(/"([^"]+)"/)?.[1];
        if (value) {
          mappings[key.trim()] = value;
        }
      }
    }
  });

  return mappings;
}

export const getEnums = async (req: Request, res: Response) => {
  try {
    const { type } = req.params;

    if (type) {
      const enumType = prismaEnums[type as keyof typeof prismaEnums];
      if (!enumType) {
        return res.status(404).json({ error: 'Enum não encontrado' });
      }

      // Extrai os mapeamentos do schema.prisma
      const mappings = extractEnumMappings(type.charAt(0).toUpperCase() + type.slice(1));
      
      // Usa o mapeamento para obter os valores corretos
      const enumValues = Object.keys(enumType).map(key => ({
        value: key,
        label: mappings[key] || key // Usa o valor mapeado ou o próprio key como fallback
      }));

      return res.json(enumValues);
    }

    // Se não especificar um tipo, retorna todos os enums
    const allEnums = Object.entries(prismaEnums).reduce((acc, [key, enumType]) => {
      const mappings = extractEnumMappings(key.charAt(0).toUpperCase() + key.slice(1));
      acc[key] = Object.keys(enumType).map(enumKey => ({
        value: enumKey,
        label: mappings[enumKey] || enumKey
      }));
      return acc;
    }, {} as Record<string, { value: string; label: string }[]>);

    return res.json(allEnums);
  } catch (error) {
    console.error('Erro ao buscar enums:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}; 