import { Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
  title: string
  expanded?: true
}

export const SimpleSummaryAccordion: React.FC<Props>= ({ title, expanded, children }) => {
  return (
    <Accordion defaultExpanded={expanded} >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className="dark:text-white" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className="dark:bg-dark02"
      >
        <span className="dark:text-white">{title}</span>
      </AccordionSummary>
      <AccordionDetails className="dark:bg-dark03">
        {children}
      </AccordionDetails>
    </Accordion>
  )
}