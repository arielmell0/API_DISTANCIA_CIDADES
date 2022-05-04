
# Desafio Dev Jr/Pl
Bem vindo(a)! Esse desafio tem como objetivo avaliar a capacidade do candidato de construir uma API seguindo as melhores práticas e padrões de desenvolvimento. 

## O Desafio
A API pode ser escrita em qualquer linguagem/framework e precisa ser conteinerizada. **Será avaliada a capacidade do candidato para escrever uma aplicação legível, testável e escalável.**

O candidato que utilizar Python com a biblioteca [FastAPI](https://fastapi.tiangolo.com/) ganhará uma pontuação bônus.

## Cenário
Uma empresa de transporte de carga e pessoal faz algumas rotas de entrega em um grupo de cidades locais. Dada uma simplificação do modelo, todas as rotas entre essas cidades são unidirecionais. Essa empresa deseja portanto conhecer as melhores rotas entre algumas cidades e suas devidas distâncias com o intuito de definir a melhor logística de trabalho. Para isso você foi contratado com o intuito de prover endpoints REST de algumas funcionalidades comuns.

## Entregáveis
- API.
- Dockerfile da API.
- Docker-compose com todos os serviços necessários.
- Testes unitários
- Testes de integração.
- Documentação.

## Avaliação
Você será avaliado nos seguintes aspectos, em ordem de prioridade:
1. Performance e correta execução da especificação funcional
2. Legibilidade de código e consistência de nomenclaturas
3. Modelagem e OO (Orientação à Objetos)
4. Testes
5. Documentação
6. Completar todas funcionalidades

Observe que neste projeto é mais importante que você entregue um código de qualidade do que todas as funcionalidades exigidas. Seu código será avaliado independente da entrega total de funcionalidades.

É esperado que você desenvolva sem ajuda ou intervenção direta de terceiros, mas encorajamos que você pesquise por soluções e boas práticas sem nenhum tipo de restrição, apenas lembre-se que serão realizadas perguntas na entrevista a fim de certificar seu conhecimento total sobre a implementação. **Jogue limpo!**

## API
A entrada será dada como um grafo direcionado onde um nó representa uma cidade e uma aresta representa uma rota entre duas cidades. O peso da aresta representa então a distância dessa rota. Uma dada rota jamais aparecerá mais de uma vez, e para uma dada rota, as cidades de origem e destino sempre serão diferentes.
Uma rota direcionada será dada como um objeto JSON, onde as cidades serão nomeadas usando letras do alfabeto [A-Z].
Exemplo: uma rota de A para B com distância 5 é representada como:

```javascript
{​
  "source": "A",
  "target": "B",
  "distance": 5
}​
```
## Funcionalidades Esperadas (Especificação Funcional)
### Salvar Grafo

Esse endpoint deverá receber as arestas de um grafo e salva-las em um banco de dados para consultas posteriores.
* Endpoint: `http://localhost:8080/graph`
* HTTP Method: POST
* HTTP Success Response Code: CREATED (201)
* Contract:
  * Request payload

```javascript
{​
  "data": [
    {​
      "source": "A", "target": "B", "distance": 6
    }​,
    {​
      "source": "A", "target": "E", "distance": 4
    }​,
    {​
      "source": "B", "target": "A", "distance": 6
    }​,
    {​
      "source": "B", "target": "C", "distance": 2
    }​,
    {​
      "source": "B", "target": "D", "distance": 4
    }​,
    {​
      "source": "C", "target": "B", "distance": 3
    }​,
    {​
      "source": "C", "target": "D", "distance": 1
    }​,
    {​
      "source": "C", "target": "E", "distance": 7
    }​,
    {​
      "source": "D", "target": "B", "distance": 8
    }​,
    {​
      "source": "E", "target": "B", "distance": 5
    }​,
    {​
      "source": "E", "target": "D", "distance": 7
    }​
  ]
}​
```
  * Response payload
```javascript
{​
  "id" : 1,
  "data":[
    {​
      "source": "A", "target": "B", "distance":6
    }​,
    {​
      "source": "A", "target": "E", "distance":4
    }​,
    {​
      "source": "B", "target": "A", "distance":6
    }​,
    {​
      "source": "B", "target": "C", "distance":2
    }​,
    {​
      "source": "B", "target": "D", "distance":4
    }​,
    {​
      "source": "C", "target": "B", "distance":3
    }​,
    {​
      "source": "C", "target": "D", "distance":1
    }​,
    {​
      "source": "C", "target": "E", "distance":7
    }​,
    {​
      "source": "D", "target": "B", "distance":8
    }​,
    {​
      "source": "E",  "target": "B", "distance":5
    }​,
    {​
      "source": "E", "target": "D", "distance":7
    }​
  ]
}​
```
### Recuperar Grafo
Esse endpoint deverá retornar um grafo previamente salvo no banco de dados. Se o grafo não existe, deverá retornar HTTP NOT FOUND.
* Endpoint: `http://localhost:8080/graph/<graphId>`
* HTTP Method: GET
* HTTP Success Response Code: OK (200)
* HTTP Error Response Code: NOT FOUND (404)
* Contract:
  * Request payload: none
  * Response payload

```javascript
{​
  "id" : 1,
  "data":[
    {​
      "source": "A", "target": "B", "distance": 6
    }​,
    {​
      "source": "A", "target": "E", "distance": 4
    }​,
    {​
      "source": "B", "target": "A", "distance": 6
    }​,
    {​
      "source": "B", "target": "C", "distance": 2
    }​,
    {​
      "source": "B", "target": "D", "distance": 4
    }​,
    {​
      "source": "C", "target": "B", "distance": 3
    }​,
    {​
      "source": "C", "target": "D", "distance": 1
    }​,
    {​
      "source": "C", "target": "E", "distance": 7
    }​,
    {​
      "source": "D", "target": "B", "distance": 8
    }​,
    {​
      "source": "E", "target": "B", "distance": 5
    }​,
    {​
      "source": "E", "target": "D", "distance": 7
    }​
  ]
}​
```
### Encontrar todas rotas disponíveis dada uma cidade de origem e outra de destino em um grafo salvo anteriormente
Utilizando um grafo salvo anteriormente, esse endpoint deverá calcular todas as rotas disponíveis de uma cidade origem para outra de destino, dado um número máximo de paradas. Se não existirem rotas possíveis, o resultado deverá ser uma lista vazia. Se o parâmetro "maxStops" não for definido, você deverá listar todas as rotas possíveis. Se o grafo não existir, deverá retornar HTTP NOT FOUND.
Exemplo: No grafo (AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7), as possíveis rotas de A para C com máximo de 3 paradas seriam: ["ABC", "ADC", "AEBC"]
* Endpoint: `http://localhost:8080/routes/<graphId>/from/<town1>/to/<town2>?maxStops=<maxStops>`
* HTTP Method: POST
* HTTP Success Response Code: OK (200)
* HTTP Error Response Code: NOT FOUND (404)
* Contract:
  * Grafo salvo anteriormente
```javascript
{​
  "data":[
    {​
      "source": "A", "target": "B", "distance": 5
    }​,
    {​
      "source": "B", "target": "C", "distance": 4
    }​,
    {​
      "source": "C", "target": "D", "distance": 8
    }​,
    {​
      "source": "D", "target": "C", "distance": 8
    }​,
    {​
      "source": "D", "target": "E", "distance": 6
    }​,
    {​
      "source": "A", "target": "D", "distance": 5
    }​,
    {​
      "source": "C", "target": "E", "distance": 2
    }​,
    {​
      "source": "E", "target": "B", "distance": 3
    }​,
    {​
      "source": "A", "target": "E", "distance": 7
    }​
  ]
}​
```
  * Request payload: none
  * Response payload
```javascript
{​
  "routes": [
    {​
      "route": "ABC",
      "stops": 2
    }​,
    {​
      "route": "ADC",
      "stops": 2
    }​,
    {​
      "route": "AEBC",
      "stops": 3
    }​
  ]
}​
```
### Determinar a distância mínima entre duas cidades em um grafo salvo

Utilizando um grafo salvo anteriormente, esse endpoint deverá determinar a rota cuja distância seja a mínima possível entre duas cidades. Se as cidades de origem e destino forem iguais, o resultado deverá ser zero. Se não exitir rota possível entre as duas cidades, então o resultado deverá ser -1. Se o grafo não existir, deverá retornar HTTP NOT FOUND.
* Endpoint: `http://localhost:8080/distance/<graphId>/from/<town1>/to/<town2>`
* HTTP Method: POST
* HTTP Success Response Code: OK (200)
* HTTP Error Response Code: NOT FOUND (404)
* Contract:
  * Grafo salvo anteriormente
```javascript
{​
  "data":[
    {​
      "source": "A", "target": "B", "distance":6
    }​,
    {​
      "source": "A", "target": "E", "distance":4
    }​,
    {​
      "source": "B", "target": "A", "distance":6
    }​,
    {​
      "source": "B", "target": "C", "distance":2
    }​,
    {​
      "source": "B", "target": "D", "distance":4
    }​,
    {​
      "source": "C", "target": "B", "distance":3
    }​,
    {​
      "source": "C", "target": "D", "distance":1
    }​,
    {​
      "source": "C", "target": "E", "distance":7
    }​,
    {​
      "source": "D", "target": "B", "distance":8
    }​,
    {​
      "source": "E",  "target": "B", "distance":5
    }​,
    {​
      "source": "E", "target": "D", "distance":7
    }​
  ]
}​
```
  * Request payload: none
  * Response payload
```javascript
{​
  "distance" : 8,
  "path" : ["A", "B", "C"]
}​
```
### Funcionalidades Bônus:
- É necessária uma ferramenta para migração de esquema de banco de dados.
- A empresa foi adquirida por um grande conglomerado e a API deverá atender um alto número de requisições por segundo.
- Precisamos de uma página web que implemente as funcionalidades.

Como você atenderia os novos requisitos? Descreva o que podemos e/ou implemente, se possível.

## Considerações
-   Você deverá criar um fork privado do projeto e compartilhar conosco. Por favor, **não** abra um merge request público.
-   O desafio deverá ser entregue em até uma semana. Se você não conseguir fazer tudo, não deixe de entregar. Se você empacar em alguma parte, nos procure e explique o que está acontecendo.
-   Faça commits atômicos e semânticos.
