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
import { CheckIcon, Edit2Icon, PlusIcon } from "lucide-react";
import style from "./EditServiceSheet.module.scss";

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

  const [items, setItems] = useState(service.items || []);

  const [boxCode, setBoxCode] = useState(service.boxCode);
  const [totalValue, setTotalValue] = useState(
    items.reduce((acc, item) => acc + item.quantity * item.value, 0)
  );
  const [quantityItems, setQuantityItems] = useState(
    items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    setCompanyName(service.companyName);
    setResale(service.resale);
    setAttendanceNumber(service.attendanceNumber);
    setSellerName(service.sellerName);
    setBoxCode(service.boxCode);
    setItems(service.items || []);
    recalculateTotals();
  }, [service]);

  const { toast } = useToast();

  const handleUpdate = async () => {
    const updatedService = {
      ...service,
      companyName,
      resale,
      attendanceNumber,
      sellerName,
      boxCode,
      items,
      totalValue,
      quantityItems,
    };

    try {
      await axios.put(
        `http://localhost:5000/services/${service.id}`,
        updatedService
      );

      onUpdate(updatedService);
      toast({
        variant: "success",
        title: "OS ATUALIZADA!",
        description: `Informações de serviço atualizadas com sucesso.`,
      });
    } catch (error) {
      console.error(`Erro ao atualizar a service: ${service.id}`, error);
      toast({
        variant: "destructive",
        title: "Erro ao ATUALIZAR as informações da OS!",
        description: `Ocorreu um erro ao tentar atualizar as informações da OS. Tente novamente.`,
      });
    }
  };

  const recalculateTotals = () => {
    const newTotalValue = items.reduce(
      (acc, item) => acc + item.quantity * item.value,
      0
    );
    const newQuantityItems = items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    setTotalValue(newTotalValue);
    setQuantityItems(newQuantityItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 0, value: 0 }]);
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    recalculateTotals();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          onClick={() => console.log("Triggou!")}
          className={style.editEmployeeButton}
        >
          <Edit2Icon />
        </Button>
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
          <fieldset className="border p-4 mt-4">
            <legend className="text-lg font-semibold">Dados da Entrega</legend>
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
          </fieldset>

          <fieldset className="border p-4 mt-4">
            <legend className="text-lg font-semibold">
              Itens a serem entregues
            </legend>

            <div className="space-y-4">
              <h4>Itens</h4>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Input
                    placeholder="Nome do Item"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                    className="col-span-2"
                  />
                  <Input
                    placeholder="Quantidade"
                    value={item.quantity}
                    type="number"
                    onChange={(e) =>
                      handleItemChange(
                        index,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="col-span-1"
                  />
                  <Input
                    placeholder="Valor"
                    value={item.value}
                    type="number"
                    onChange={(e) =>
                      handleItemChange(index, "value", Number(e.target.value))
                    }
                    className="col-span-1"
                  />
                </div>
              ))}
              <Button type="button" onClick={handleAddItem}>
                Adicionar Item <PlusIcon />
              </Button>
            </div>

            <fieldset className="border p-4 mt-4">
              <legend className="text-lg font-semibold">Total</legend>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalValue" className="text-right">
                  Total (R$)
                </Label>
                <Input
                  disabled
                  id="totalValue"
                  value={totalValue}
                  onChange={(e) => setTotalValue(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 m-2 items-center gap-4">
                <Label htmlFor="quantityItems" className="text-right">
                  Qnt
                </Label>
                <Input
                  disabled
                  id="quantityItems"
                  value={quantityItems}
                  onChange={(e) => setQuantityItems(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </fieldset>
          </fieldset>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" onClick={handleUpdate}>
              Salvar alterações
              <CheckIcon />
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditServiceSheet;
