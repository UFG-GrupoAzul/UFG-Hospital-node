import {prisma} from "../index";

class DoctorService {

    async create(name: string, cpf: string, phone: string, registration: string, crm: string): Promise<any> {
        // const employeeExist = await this.findByCpf(cpf);
        // if (employeeExist && employeeExist.id != id) {
        //     throw new Error("Employee already exists in the database.");
        // }
        try {
            return await prisma.doctor.create({
                data: {
                    crm,
                    Employee: {
                        create: {
                            registration,
                            person: {
                                create: {
                                    name,
                                    cpf,
                                    phone,
                                    dType: "Doctor"
                                }
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async update(id: string, name: string, cpf: string, phone: string, registration: string, crm: string) {
        try {
            const doctorExists = await this.findByCpf(cpf);

            if (doctorExists && doctorExists.id != id) {
                throw new Error("Doctor already exists with this CP.");
            }

            return await prisma.doctor.update({
                where: {id},
                data:  {
                    crm,
                    Employee: {
                        create: {
                            registration,
                            person: {
                                create: {
                                    name,
                                    cpf,
                                    phone,
                                    dType: "Doctor"
                                }
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
        }catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAll(){
        try{
            return await prisma.doctor.findMany({
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            })
        }catch (error){
            console.error(error);
            throw error;
        }
    }

    async getById(id: string){
        try{
            return await prisma.doctor.findUnique({where:{id:id},
                select: {
                    id: true,
                    crm: true,
                    Employee: {
                        select: {
                            registration: true,
                            person: {
                                select: {
                                    cpf: true,
                                    phone: true,
                                    name: true
                                }
                            }
                        }
                    }
                }});
        }catch (error){
            console.error(error);
            throw error;
        }
    }

    async delete(id: string){
        try{
            return await prisma.doctor.findUnique({where:{id:id},})

        }catch (error){
            console.error(error);
            throw error;
        }
    }

    private async findByCpf(cpf: string) {
        try {
            return await prisma.person.findUnique({
                where: {cpf}
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export {DoctorService};