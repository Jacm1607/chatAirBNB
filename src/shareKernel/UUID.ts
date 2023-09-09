import { BadRequestException } from "@nestjs/common";

export const UUIDValid = (uuid: string) => {
    const uuidv4Regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    if (!uuidv4Regex.test(uuid)) {
        throw new BadRequestException();
    }
}