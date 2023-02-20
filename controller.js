let storage = [];

class controller {
    reply(client, message) {

        if (message.body === '#ping') {
            client.reply(message.from, 'pong', message.id.toString())
            .catch((erro) => {
                console.error('Error when sending: ', erro);
            });
        }
        
        if(message.type == 'image' && message.caption == '#s') {
            client.downloadMedia(message)
            .then((result) => {
                client.sendImageAsSticker(message.from, result);
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro);
            });
        }

        if(message.body == '#rf') {

            this.startStage(message.from);

            if(this.getStage(message.from) == "0") {
                storage[message.from].stage = "1";

                client.sendListMessage(message.from, {
                    buttonText: 'Selecione',
                    description: 'Escolha a categoria:',
                    sections: [
                      {
                        title: 'Despesa',
                        rows: [
                          {
                            rowId: '1',
                            title: 'Dízimo',
                          },
                          {
                            rowId: '2',
                            title: 'Oferta',
                          },
                          {
                            rowId: '3',
                            title: 'Luz',
                          },
                          {
                            rowId: '4',
                            title: 'Água',
                          },
                          {
                            rowId: '5',
                            title: 'Internet',
                          },
                          {
                            rowId: '6',
                            title: 'Celular',
                          },
                          {
                            rowId: '7',
                            title: 'Viagem',
                          },
                          {
                            rowId: '8',
                            title: 'Bus/metro',
                          },
                          {
                            rowId: '9',
                            title: 'Taxi/Uber',
                          },
                          {
                            rowId: '10',
                            title: 'Supermercado',
                          },
                          {
                            rowId: '11',
                            title: 'Fastfood',
                          },
                          {
                            rowId: '12',
                            title: 'Cuidado pessoal',
                          },
                          {
                            rowId: '13',
                            title: 'Role',
                          },
                          {
                            rowId: '14',
                            title: 'Outro',
                          },
                        ],
                      },
                    ],
                  });
            } 
        }

        switch(this.getStage(message.from)) {
            case "1":
                if(this.getCategory(message)) {
                  client.sendText(message.from, "Digite o valor do registro (use ponto no lugar de vírgula):")
                  .catch((erro) => {
                      console.error('Error when sending: ', erro);
                  });
                } else {
                  client.sendText(message.from, "Opção inválida, selecione outra vez")
                  .catch((erro) => {
                      console.error('Error when sending: ', erro);
                  });
                }
                break;

            case "2":
              
                break;

            case "3":
                break;

            case "4":
                break;

            default:
                console.log(`Stage is ${this.getStage(message.from)}`);
                break;
        }
    }

    /* stages:
    * 1 - waiting category
    * 2 - waiting value
    * 3 - waiting description
    * 4 - waiting confirmation
    */
    startStage(from) {
      if(!storage[from]) {
        storage[from] = {
          stage: "0",
          category: null,
          value: null,
          description: null
        };
      }
    }

    getStage(from) {
      if(storage[from]) {
          return storage[from].stage;
      } else {
          return null;
      }
    }

    getCategory(message) {
        let choice = [message.body];
            let menuOptions = ['Dízimo', 'Oferta', 'Luz', 'Água', 'Internet', 'Celular', 'Viagem', 'Bus/metro', 'Taxi/Uber', 'Supermercado', 'Fastfood', 'Cuidado pessoal', 'Role', 'Outro'];

            let result = menuOptions.filter(function (item) {
                return choice.indexOf(item) > -1;
            });
            if(result.length === 1) {
                storage[message.from].stage = "2";
                storage[message.from].category = message.body;
                console.log(storage);
                return true;
            };
            return false;        
    }
}

module.exports = new controller();