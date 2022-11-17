import { Controller, Get, Param } from '@nestjs/common';

@Controller({ version: '1', path: 'stats' })
export class StatControllerV1 {
  @Get()
  findAll(): string {
    return 'This action returns all stats';
  }

  @Get('historicTop')
  getHistoricTop(): string {
    return 'This action returns all historicTop';
  }

  @Get('historicTop/:id')
  getHistoricTopId(@Param('id') id: string): string {
    return `This action returns a #${id} historicTop`;
  }

  @Get('farmSets')
  getFarmSets(): string {
    return 'This action returns all farmSets';
  }

  @Get('mapset/:id')
  getMapsetId(@Param('id') id: string): string {
    return `This action returns a #${id} mapset`;
  }

  @Get('ppBarrier')
  getPpBarrier(): string {
    return 'This action returns all ppBarrier';
  }

  @Get('idCounts')
  getIdCounts(): string {
    return 'This action returns all idCounts';
  }

  @Get('idCount/:id')
  getIdCountId(@Param('id') id: string): string {
    return `This action returns a #${id} idCount`;
  }

  @Get('mapsets')
  getMapsets(): string {
    return 'This action returns all mapsets';
  }
}
