import {logger} from 'codelyzer/util/logger';
import {AppService} from "../service/app.services";

export class AppCtrl {

  constructor(private appService: AppService) {
  }

  // async consultar(rut) {
  //   try {
  //     const resp = await this.appService.consultar(rut);
  //     logger.info(resp);
  //     return resp;
  //   } catch (err) {
  //     logger.error(err);
  //     return {
  //       err
  //     };
  //   }
  // }
  //
  // async editar(nombre) {
  //   try {
  //     const resp = await this.appService.editar(nombre);
  //     logger.info(resp);
  //     return resp;
  //   } catch (err) {
  //     logger.error(err);
  //     return {
  //       err
  //     };
  //   }
  // }

  // async agregar(req) {
  //   try {
  //     const resp = await this.appService.agregar(req);
  //     logger.info(resp);
  //     return resp;
  //   } catch (err) {
  //     logger.error(err);
  //     return {
  //       err
  //     };
  //   }
  // }

  async create(req) {
    try {
      const resp = await this.appService.create(req);
      logger.info(resp);
      return resp;
    } catch (err) {
      logger.error(err);
      return {
        err
      };
    }
  }
}
