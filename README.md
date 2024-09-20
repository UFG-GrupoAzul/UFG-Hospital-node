**Programação Back-End Avançada**<br/>
**Prof.:** Paulo Roberto Batista Júnior<br/>
**Alunos:**<br/>
Alexsandro Beserra Bastos<br/>
Danillo Tomaz Parreira<br/>
Luana Da Silva Sampaio<br/>
Mathias Matos de Oliveira<br/>
Sergio Castro Dos Santos Sales Cabral<br/>

**Projeto desenvolvido com:** Node, Prisma e MongoDB

Observação: Criar o arquivo .env com base no arquivo .env.bkp e atualizar a url do banco de dados.

# UFG-Hospital
## Sistema de Transferência de Pacientes (STP)
### Escopo do problema
A falta de prática na realização de transferências por parte de alguns médicos, combinada com as dificuldades inerentes à movimentação de pacientes entre unidades hospitalares, muitas vezes em ambientes desconhecidos, torna as transferências de procedimentos desafiadoras e com comunicação dificultada entre as partes envolvidas. Essa situação evidencia a necessidade de um sistema de gerenciamento de transferências hospitalares, capaz de auxiliar os principais
interessados nesse processo em aspectos logísticos e burocráticos. Alguns benefícios esperados
deste Sistema de Transferência de Pacientes (STP) incluem:
- Suporte aos médicos reguladores responsáveis pelas transferências de pacientes, alocação e seleção dos recursos hospitalares;
- Facilitação da logística das transferências;
- Simplificação da coleta da documentação legal referente à condição de cada paciente transferido;
- Aperfeiçoamento da comunicação entre as unidades hospitalares de origem e destino.

Algumas questões devem ser consideradas antes do desenvolvimento do STP:
- como integrar de maneira eficaz diferentes sistemas, tanto do SUS quanto das várias operadoras de seguro de saúde;
- como coletar informações durante o trajeto da unidade de origem para a unidade de destino;
- como obter em tempo real informações sobre a disponibilidade de leitos e pessoal nas unidades
de destino potenciais.

## Identificação de Necessidades Gerais do STP
|  Necessidade  | Interessado |
| ------------- | ------------- |
| Obter informações sobre dados de pacientes necessários para a transferência | Médico(a) |
| Obter informações sobre formas de logística e tipos de equipamentos | Médico(a) |
| Obter informações sobre classificações de transferências | Médico(a) |
| Obter informações sobre preparação e acondicionamento do paciente | Médico(a) |
| Obter informações sobre equipamentos | Médico(a) |
| Obter informações sobre documentação e segurança | Médico(a) |

### Classes de Usuários
 - Médico(a) regulador(a)
 - Médico(a) de origem
 - Médico(a) de destino

## REQUISITOS FUNCIONAIS ESSENCIAIS

**RF01.** Como médico(a) regulador(a), desejo visualizar, adicionar e remover informações, alterar parâmetros e fazer modificações diversas no prontuário online do paciente antes e durante a transferência.

**RF02.** Como médico(a) regulador(a), desejo especificar o meio de transporte da transferência do paciente: ambulância terrestre, barco, helicóptero ou avião.

**RF03.** Como médico(a) regulador(a), desejo selecionar uma unidade hospitalar de destino, de acordo com as necessidades do paciente, para receber a transferência.

**RF04.** Como médico(a) regulador(a), desejo visualizar uma lista de unidades hospitalares
disponíveis para receber transferências, com os meios de contato disponíveis e as informações
sobre o pessoal responsável pela recepção.

**RF05.** Como médico(a) regulador(a), desejo cadastrar o horário de saída do paciente, selecionar a unidade de destino e saber o horário previsto de chegada.

**RF06.** Como médico(a), desejo realizar solicitações de transferência de pacientes.

**RF07.** Como médico(a), desejo especificar a classificação da transferência a ser realizada, seja ela primária, secundária ou terciária.

**RF08.** Como médico(a), desejo listar todas as drogas administradas no paciente e escrever
detalhes de sua utilização no documento de transferência.

**RF09.** Como médico(a), desejo anexar ao documento de transferência do paciente uma lista de verificação previamente preparada dos procedimentos de acondicionamento.

**RF10.** Como médico(a) da unidade de origem, desejo estabelecer procedimentos a serem
seguidos pelos profissionais da unidade de destino e anexá-los ao documento de transferência do paciente****
