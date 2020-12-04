"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScorecardController = void 0;
const common_1 = require("@nestjs/common");
const scorecard_service_1 = require("./scorecard.service");
let ScorecardController = class ScorecardController {
    constructor(scorecardService) {
        this.scorecardService = scorecardService;
    }
    async getAllScorecards(pageNumber = 1, pageSize = 0, exclude = '') {
        const count = await this.scorecardService.getCount(exclude);
        pageNumber =
            typeof pageNumber === 'string' ? parseInt(pageNumber) : pageNumber;
        pageSize = typeof pageSize === 'string' ? parseInt(pageSize) : pageSize;
        const res = await this.scorecardService.getAllScorecards(pageNumber, pageSize, exclude);
        return { res: res, total: count };
    }
    async getScorecard(id) {
        return this.scorecardService.getScorecard(id);
    }
    createScorecard(examID, user, answers) {
        return this.scorecardService.createScorecard(examID, user, answers);
    }
    updateScorecard(scorecardID, scorecard, type) {
        return this.scorecardService.updateScorecard(scorecardID, scorecard, type);
    }
    deleteScorecard(scorecardID) {
        return this.scorecardService.deleteScorecard(scorecardID);
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query('pageNumber')),
    __param(1, common_1.Query('pageSize')),
    __param(2, common_1.Query('exclude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ScorecardController.prototype, "getAllScorecards", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScorecardController.prototype, "getScorecard", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Query('examID')),
    __param(1, common_1.Query('user')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Array]),
    __metadata("design:returntype", Promise)
], ScorecardController.prototype, "createScorecard", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Query('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", Promise)
], ScorecardController.prototype, "updateScorecard", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScorecardController.prototype, "deleteScorecard", null);
ScorecardController = __decorate([
    common_1.Controller('scorecards'),
    __metadata("design:paramtypes", [scorecard_service_1.ScorecardService])
], ScorecardController);
exports.ScorecardController = ScorecardController;
//# sourceMappingURL=scorecard.controller.js.map