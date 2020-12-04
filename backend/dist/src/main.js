"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_filter_1 = require("./filters/http.filter");
const fallback_filter_1 = require("./filters/fallback.filter");
const validation_filter_1 = require("./filters/validation.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new fallback_filter_1.FallbackExceptionFilter(), new http_filter_1.HttpExceptionFilter(), new validation_filter_1.ValidationFilter());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map