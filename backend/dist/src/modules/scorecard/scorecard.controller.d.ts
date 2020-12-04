import { ScorecardService } from './scorecard.service';
import { Scorecard } from '../../interfaces/scorecard';
export declare class ScorecardController {
    private readonly scorecardService;
    constructor(scorecardService: ScorecardService);
    getAllScorecards(pageNumber?: number, pageSize?: number, exclude?: string): Promise<any>;
    getScorecard(id: string): Promise<Scorecard>;
    createScorecard(examID: string, user: string, answers: Array<any>): Promise<Scorecard>;
    updateScorecard(scorecardID: string, scorecard: Partial<Scorecard>, type: string): Promise<Scorecard>;
    deleteScorecard(scorecardID: string): Promise<Scorecard>;
}
