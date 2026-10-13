# Five Bet — protótipo visual

Interface web responsiva para uma experiência de esportes e bilhete de apostas **em modo de demonstração**.

## Executar localmente

Requer Node.js 18 ou compatível.

```bash
npm install
npm start
```

Abra o endereço local indicado pelo Create React App (normalmente http://localhost:3000).

Para gerar a versão de produção:

```bash
npm run build
```

## O que já funciona nesta versão

- Layout responsivo para desktop e celular.
- Navegação visual entre destaques e jogos ao vivo.
- Busca por times e campeonatos.
- Seleção de cotações ilustrativas e montagem de bilhete.
- Remoção de seleções, limpeza do bilhete e cálculo ilustrativo de cotação/retorno.
- Mensagens de demonstração para ações ainda não integradas.

## Importante

Os jogos, placares, odds e valores são dados fictícios. O protótipo **não recebe apostas, não movimenta dinheiro e não possui autenticação conectada**. Não há integração de API nesta etapa. Antes de qualquer uso real, serão necessários backend confiável, autenticação, regras de saldo e liquidação no servidor, provedores licenciados, testes de segurança e revisão das exigências legais aplicáveis.
