import { Injectable } from "@nestjs/common";

@Injectable()
export class VariantsService {

    all() {
        const json = {
            data: {
                variants: []
            }
        }
        try {
            const variants = require('@json/variants.json');
            json.data.variants = variants;
        } catch (error) {
            console.log(error);
        }
        return json
    }
}