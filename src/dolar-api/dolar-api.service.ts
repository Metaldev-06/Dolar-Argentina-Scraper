import { Injectable } from '@nestjs/common';
import { extractDolarValue } from '../common/scripts/getDolarValue';

@Injectable()
export class DolarApiService {
  async findAll() {
    const dolarValue = await extractDolarValue();
    const sanitizedData = dolarValue.map((dolar) => ({
      ...dolar,
      buyPrice: sanitizePrice(dolar.buyPrice),
      sellPrice: sanitizePrice(dolar.sellPrice),
    }));
    return sanitizedData;
  }

  async findOne(title: string) {
    const dolarValue = await extractDolarValue();
    const normalizedTitle = normalizeString(title);

    const result = dolarValue.find((dolar) =>
      normalizeString(dolar.title).includes(normalizedTitle),
    );

    if (result) {
      return {
        ...result,
        buyPrice: sanitizePrice(result.buyPrice),
        sellPrice: sanitizePrice(result.sellPrice),
      };
    } else {
      return { message: 'No se encontró el tipo de dólar solicitado.' };
    }
  }

  async findOneValue(title: string) {
    const dolarValue = await extractDolarValue();
    const normalizedTitle = normalizeString(title);

    // Filtrar el resultado
    const result = dolarValue.find((dolar) =>
      normalizeString(dolar.title).includes(normalizedTitle),
    );

    // Devolver solo el valor de venta del resultado encontrado
    return result
      ? sanitizePrice(result.sellPrice)
      : { message: 'No se encontró el tipo de dólar solicitado.' };
  }
}

function normalizeString(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function sanitizePrice(price: string): number {
  // Eliminar el símbolo de moneda y el punto como separador de miles, luego reemplazar la coma decimal por un punto.
  const sanitized = price
    .replace(/[^\d,]/g, '')
    .replace('.', '')
    .replace(',', '.');
  return parseFloat(sanitized);
}
