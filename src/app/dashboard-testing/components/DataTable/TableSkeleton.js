import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TableSkeleton({ columns, rows = 5 }) {
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {columns.map((col) => (
              <TableHead
                key={col.id}
                className="py-4 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <Skeleton className="h-4 w-20" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <TableRow key={rowIndex} className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
              {columns.map((col) => (
                <TableCell key={col.id} className="py-4 px-4 text-sm text-gray-900">
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

