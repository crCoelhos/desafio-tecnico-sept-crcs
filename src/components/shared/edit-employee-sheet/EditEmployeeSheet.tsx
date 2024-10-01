import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import axios from "axios";
import { Employee } from "@/types/employee";
import { Edit2Icon } from "lucide-react";
import style from "./EditEmployeeSheet.module.scss";
import { useToast } from "@/hooks/use-toast";

interface EditEmployeeSheetProps {
  employee: Employee;
  onUpdate: (updatedEmployee: Employee) => void;
}

const EditEmployeeSheet: React.FC<EditEmployeeSheetProps> = ({
  employee,
  onUpdate,
}) => {
  const [name, setName] = useState(employee.name);
  const [cpf, setCpf] = useState(employee.CPF);
  const [transportType, setTransportType] = useState(employee.transportType);
  const [retailName, setRetailName] = useState(employee.retailName);
  const { toast } = useToast();

  useEffect(() => {
    setName(employee.name);
    setCpf(employee.CPF);
    setTransportType(employee.transportType);
    setRetailName(employee.retailName);
  }, [employee]);

  const handleUpdate = async () => {
    const updatedEmployee = {
      ...employee,
      name,
      CPF: cpf,
      transportType,
      retailName,
    };

    try {
      await axios.put(
        `http://localhost:5000/employees/${employee.id}`,
        updatedEmployee
      );

      onUpdate(updatedEmployee);
      toast({
        variant: "success",
        title: "Colaborador ATUALIZADO!",
        description: `O colaborador foi atualizado com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao atualizar o empregado:", error);
      toast({
        variant: "destructive",
        title: "Erro ao ATUALIZAR Colaborador!",
        description: `Ocorreu um erro ao tentar atualizar o colaborador. Tente novamente.`,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={style.editEmployeeButton}>
          <Edit2Icon className={style.editIcon}></Edit2Icon>Editar
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Entrega</SheetTitle>
          <SheetDescription>
            Faça alterações na entrega aqui. Clique em salvar quando terminar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpf" className="text-right">
              CPF
            </Label>
            <Input
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="transportType" className="text-right">
              Tipo de Transporte
            </Label>
            <Input
              id="transportType"
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="retailName" className="text-right">
              Revendedor
            </Label>
            <Input
              id="retailName"
              value={retailName}
              onChange={(e) => setRetailName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={handleUpdate}>
              Salvar alterações
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditEmployeeSheet;
