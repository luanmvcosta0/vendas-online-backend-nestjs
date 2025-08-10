import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';

@Controller('state')
export class StateController {

    //Construtor do service para puxar os metodos da logica
    constructor(private readonly stateService: StateService) {};

    //Métodos para buscar todos os estados
    @Get()
    async getAllStates(): Promise<StateEntity[]> {
        return this.stateService.getAllState();
    }

}
