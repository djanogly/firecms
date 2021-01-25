import { MapProperty } from "../../models";
import {
    PreviewComponentFactoryProps,
    PreviewComponentProps
} from "../../models/preview_component_props";
import ErrorBoundary from "../../components/ErrorBoundary";
import React from "react";
import {
    createStyles,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PreviewComponent from "../PreviewComponent";

const useStyles = makeStyles(() =>
    createStyles({
        tableNoBottomBorder: {
            "&:last-child th, &:last-child td": {
                borderBottom: 0
            }
        },
        verticalAlignTop: {
            verticalAlign: "top"
        }
    })
);

export function MapPreview<T>({
                                  name,
                                  value,
                                  property,
                                  size,
                                  entitySchema,
                                  PreviewComponent
                              }: PreviewComponentProps<T> & PreviewComponentFactoryProps) {

    if (property.dataType !== "map") {
        throw Error("Picked wrong preview component MapPreview");
    }

    const mapProperty = property as MapProperty;

    if (!value) return null;

    const classes = useStyles();

    let mapPropertyKeys: string[];
    if (size === "regular") {
        mapPropertyKeys = Object.keys(mapProperty.properties);
    } else {
        mapPropertyKeys = mapProperty.previewProperties || Object.keys(mapProperty.properties);
        if (size === "small")
            mapPropertyKeys = mapPropertyKeys.slice(0, 3);
        else if (size === "tiny")
            mapPropertyKeys = mapPropertyKeys.slice(0, 1);
    }

    if (size !== "regular")
        return (
            <>
                {mapPropertyKeys.map((key, index) => (
                    <div
                        key={"map_preview_" + mapProperty.title + key + index}>
                        <ErrorBoundary>
                            <PreviewComponent name={key}
                                              value={value[key] as any}
                                              property={mapProperty.properties[key]}
                                              size={size}
                                              entitySchema={entitySchema}/>
                        </ErrorBoundary>
                    </div>
                ))}
            </>
        );

    return (
        <Table size="small" key={`map_preview_${name}`}>
            <TableBody>
                {mapPropertyKeys &&
                mapPropertyKeys.map((key, index) => {
                    return (
                        <TableRow
                            key={`map_preview_table_${name}_${index}`}
                            className={classes.tableNoBottomBorder}>
                            <TableCell key={`table-cell-title-${name}-${key}`}
                                       className={classes.verticalAlignTop}
                                       width="30%"
                                       component="th">
                                <Typography variant={"caption"}
                                            color={"textSecondary"}>
                                    {mapProperty.properties[key].title}
                                </Typography>
                            </TableCell>
                            <TableCell key={`table-cell-${name}-${key}`}
                                       width="70%"
                                       className={classes.verticalAlignTop}
                                       component="th">
                                <ErrorBoundary>
                                    <PreviewComponent
                                        name={key}
                                        value={value[key] as any}
                                        property={mapProperty.properties[key]}
                                        size={"small"}
                                        entitySchema={entitySchema}/>
                                </ErrorBoundary>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );

}
