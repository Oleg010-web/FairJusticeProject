import { FormValues } from './../ui/components/form/Form';
// @ts-ignore
import Parse from 'parse/dist/parse.min.js';

// Ваша функция для создания клиента
export async function createParseClient(data: FormValues) {
  const client = new Parse.Object('Client');
  client.set("name", data.name);
  client.set("number", data.number.toString());
  client.set("task", data.task);
    try {
      console.log(data);
      const result: Parse.Object = await client.save(); 
      console.log('Client created', result);
    } catch (error: any) {
      console.error(`Error: ${error.code} - ${error.message}`);
      throw new Error(error.message || 'Неизвестная ошибка при создании клиента');
    }
}


