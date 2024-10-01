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
import { Service } from "@/types/service";
import { useToast } from "@/hooks/use-toast";
// import style from "./EditServiceSheet.module.scss";

interface EditServiceSheetProps {
  service: Service;
  onUpdate: (updatedService: Service) => void;
}

const EditServiceSheet: React.FC<EditServiceSheetProps> = ({
  service,
  onUpdate,
}) => {
  const [companyName, setCompanyName] = useState(service.companyName);
  const [resale, setResale] = useState(service.resale);
  const [attendanceNumber, setAttendanceNumber] = useState(
    service.attendanceNumber
  );
  const [sellerName, setSellerName] = useState(service.sellerName);
  const [totalValue, setTotalValue] = useState(service.totalValue);
  const [quantityItems, setQuantityItems] = useState(service.quantityItems);
  const [boxCode, setBoxCode] = useState(service.boxCode);

  useEffect(() => {
    setCompanyName(service.companyName);
    setResale(service.resale);
    setAttendanceNumber(service.attendanceNumber);
    setSellerName(service.sellerName);
    setTotalValue(service.totalValue);
    setQuantityItems(service.quantityItems);
    setBoxCode(service.boxCode);
  }, [service]);

  const { toast } = useToast();

  const handleUpdate = async () => {
    const updatedService = {
      ...service,
      companyName,
      resale,
      attendanceNumber,
      sellerName,
      totalValue,
      quantityItems,
      boxCode,
    };

    try {
      await axios.put(
        `http://localhost:5000/employees/${service.id}`,
        updatedService
      );

      onUpdate(updatedService);
      toast({
        variant: "success",
        title: "OS ATUALIZADA!",
        description: `Informações de serviço atualizadas com sucesso.`,
      });
    } catch (error) {
      console.error("Erro ao atualizar o empregado:", error);
      toast({
        variant: "destructive",
        title: "Erro ao ATUALIZAR as informações da OS!",
        description: `Ocorreu um erro ao tentar atualizar as informações da OS. Tente novamente.`,
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button onClick={() => console.log("Triggou!")}>Editar</Button>
      </SheetTrigger>

      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Editar Serviço</SheetTitle>
          <SheetDescription>
            Faça alterações na ordem de serviço aqui. Clique em salvar quando
            terminar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="companyName" className="text-right">
              Empresa
            </Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resale" className="text-right">
              Revenda
            </Label>
            <Input
              id="resale"
              value={resale}
              onChange={(e) => setResale(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="attendanceNumber" className="text-right">
              Número do Atendimento
            </Label>
            <Input
              id="attendanceNumber"
              value={attendanceNumber}
              onChange={(e) => setAttendanceNumber(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sellerName" className="text-right">
              Vendedor
            </Label>
            <Input
              id="sellerName"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="totalValue" className="text-right">
              Total (R$)
            </Label>
            <Input
              id="totalValue"
              value={totalValue}
              onChange={(e) => setTotalValue(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantityItems" className="text-right">
              Quantidade de itens
            </Label>
            <Input
              id="quantityItems"
              value={quantityItems}
              onChange={(e) => setQuantityItems(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="boxCode" className="text-right">
              Código da caixa
            </Label>
            <Input
              id="boxCode"
              value={boxCode}
              onChange={(e) => setBoxCode(Number(e.target.value))}
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

export default EditServiceSheet;
