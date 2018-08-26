package zti.expenses.collections;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import zti.expenses.user.ApplicationUser;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "collections")
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"owner_id", "name"})})
public class Collection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Size(max = 50)
    @Column(nullable = false)
    private String name;

    @JoinColumn(nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ApplicationUser owner;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "collection")
    private Set<Expense> expenses = new HashSet<>();

    private String description;

    protected Collection() { }

    public Collection(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ApplicationUser getOwner() {
        return owner;
    }

    public void setOwner(ApplicationUser owner) {
        this.owner = owner;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
