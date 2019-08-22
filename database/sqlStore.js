export const findAllItemsWithSearch = `select
                                        i.id,
                                        i.name,
                                        i.container_id,
                                        c.name as container_name
                                    from
                                        items i, containers c
                                    where 
                                        c.id = i.container_id and i.name like ?`

export const findAllItems = `select
                                i.id,
                                i.name,
                                i.container_id,
                                c.name as container_name
                            from
                                items i, containers c
                            where 
                                c.id = i.container_id`                                

export const getContainerByid = `select 
                                  con.id, 
                                  con.name, 
                                  con.date_entered, 
                                  cat.name as category_name,
                                  loc.name as location_name
                                  from 
                                    containers con, categories cat, locations loc
                                  where 
                                    con.category_id = cat.id 
                                    and con.location_id = loc.id
                                    and con.id = ?`

export const getContainerItems = `select
                                    i.id,
                                    i.name,
                                    i.date_entered
                                  from
                                    items i, containers c
                                  where
                                    c.id = i.container_id and c.id = ?`

export const getItemCountWithSearch = `SELECT count(*) as totalCount from items i, containers c where c.id = i.container_id and i.name like ?`                                     
export const getItemCount = `SELECT count(*) as totalCount from items i, containers c where c.id = i.container_id`  

