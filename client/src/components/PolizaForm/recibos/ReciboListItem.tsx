import { Recibo } from "../../../types/interfaces";
import ListItem from "../../utils/ListItem";

const ReciboListItem = ({recibo}: {recibo: Recibo}) => {
  return <ListItem>{recibo.exhibicion}</ListItem>;
};

export default ReciboListItem;
